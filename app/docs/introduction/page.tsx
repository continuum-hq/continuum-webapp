import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function IntroductionPage() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1>Welcome to Continuum</h1>
      <p className="text-xl text-muted-foreground">
        <strong>Continuum</strong> is an AI-powered Slack agent that brings Jira, GitHub, and team collaboration tools into your Slack workspace. Ask questions naturally, execute actions, and get intelligent task assignment suggestions—all without leaving Slack.
      </p>

      <h2>What You Can Do</h2>
      <p>With Continuum, you can:</p>
      <ul>
        <li>📋 <strong>Query Jira</strong>: Get issue details, search tasks, check sprint status</li>
        <li>🔀 <strong>Manage GitHub</strong>: View PRs, check review status, merge requests</li>
        <li>🧠 <strong>Smart Delegation</strong>: Get AI-powered task assignment suggestions</li>
        <li>💬 <strong>Natural Language</strong>: Ask questions in plain English</li>
        <li>🔄 <strong>Execute Actions</strong>: Create issues, update statuses, assign tasks</li>
      </ul>

      <h2>How It Works</h2>
      <ol>
        <li><strong>Install</strong> Continuum to your Slack workspace</li>
        <li><strong>Connect</strong> your Jira and/or GitHub accounts (OAuth-based, secure)</li>
        <li><strong>Start using</strong> by mentioning <code>@continuum</code> in any channel or DM</li>
        <li><strong>Ask naturally</strong> and get rich, formatted responses</li>
      </ol>

      <h2>Example</h2>
      <pre className="bg-card border border-border rounded-lg p-4 overflow-x-auto">
        <code>{`You: @continuum show my open tasks

Continuum: 📋 Here are your open tasks:

✅ KAN-123 - Fix login bug (In Progress)
📝 KAN-124 - Update API docs (To Do)
🔴 KAN-125 - Security audit (Blocked)

[View in Jira] [Assign] [Update Status]`}</code>
      </pre>

      <div className="mt-8 pt-8 border-t border-border">
        <h2>Next Steps</h2>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link href="/docs/quick-start">
            <Button variant="default" className="w-full sm:w-auto">
              Quick Start Guide
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link href="/docs/basic-commands">
            <Button variant="outline" className="w-full sm:w-auto">
              Learn Commands
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
