import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export const runtime = "edge"

export async function POST(req: Request) {
  try {
    const { messages, featureId, featureTitle } = await req.json()

    // Create a system message that provides context about the feature
    const systemMessage = getSystemMessageForFeature(featureId, featureTitle)

    // Prepare the messages array with the system message first
    const apiMessages = [{ role: "system", content: systemMessage }, ...messages]

    const result = streamText({
      model: openai("gpt-4o"),
      messages: apiMessages,
    })

    // Convert the response to a streaming text response
    return result.toDataStreamResponse()
  } catch (error) {
    console.error("OpenAI API error:", error)
    return new Response(JSON.stringify({ error: "An error occurred while processing your request" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

// Helper function to generate system messages based on the feature
function getSystemMessageForFeature(featureId: string, featureTitle: string): string {
  const baseContext = `You are an AI assistant for a GitHub-like platform. You are currently helping a user learn more about the "${featureTitle}" feature. Be helpful, concise, and informative. Provide specific details and examples when possible.`

  switch (featureId) {
    case "version-control":
      return `${baseContext}
      
Information about Advanced Version Control:
- The platform offers Git-based version control with extended capabilities
- Features include branching strategies (feature, release, and hotfix branches)
- Support for pull requests with code review workflows
- Conflict resolution tools with visual diff comparisons
- History tracking with detailed commit information
- Release management with versioning and tagging
- Branch protection rules to enforce code quality
- Rebase and merge options for different workflow preferences
- Stashing changes for work-in-progress
- Cherry-picking for selective commit application`

    case "collaboration":
      return `${baseContext}
      
Information about Seamless Collaboration:
- Real-time collaborative editing with presence indicators
- Commenting and discussion threads on code, issues, and pull requests
- @mentions to notify team members
- Code review tools with inline commenting and suggestion proposals
- Project boards for task management and tracking
- Team management with roles and permissions
- Notifications and activity feeds
- Integration with communication tools
- Co-authoring support for shared credit on commits
- Collaborative documentation with wiki support`

    case "security":
      return `${baseContext}
      
Information about Enterprise-Grade Security:
- Role-based access control (RBAC) for precise permissions
- Two-factor authentication (2FA) support
- Single sign-on (SSO) integration
- Audit logs for all account activities
- Secret scanning to prevent credential leaks
- Vulnerability detection in dependencies
- Code scanning for security issues
- IP allow lists for access restrictions
- Data encryption at rest and in transit
- Compliance certifications (SOC 2, GDPR, etc.)`

    case "ai-assistance":
      return `${baseContext}
      
Information about AI-Powered Assistance:
- Intelligent code suggestions as you type
- Automated code reviews highlighting potential issues
- Bug detection and fix recommendations
- Performance optimization suggestions
- Documentation generation from code
- Natural language to code translation
- Code explanation in plain English
- Refactoring recommendations
- Learning from your codebase to provide contextual help
- Integration with development environments`

    case "workflow":
      return `${baseContext}
      
Information about Modern Development Workflow:
- CI/CD pipeline integration for automated testing and deployment
- Support for various deployment strategies (blue-green, canary, etc.)
- Issue tracking and management
- Automated dependency updates
- Environment management for staging, testing, and production
- Feature flagging for controlled rollouts
- Metrics and monitoring integration
- Automated testing frameworks support
- Release notes generation
- Integration with popular development tools and services`

    default:
      return baseContext
  }
}
