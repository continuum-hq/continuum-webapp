import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";

interface WaitlistConfirmationEmailProps {
  email: string;
}

export const WaitlistConfirmationEmail = ({
  email,
}: WaitlistConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to the Continuum waitlist! 🎉</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Logo/Brand */}
        <Section style={header}>
          <div style={logoContainer}>
            {/* <div style={logo} /> */}
            <Heading style={brandName}>Continuum</Heading>
          </div>
        </Section>

        {/* Main Content */}
        <Section style={content}>
          <Heading style={h1}>You're on the list!</Heading>

          <Text style={text}>
            Thank you for joining the Continuum waitlist. We're building
            something special to help engineering teams eliminate context
            switching and work in one unified flow.
          </Text>

          <Text style={text}>
            You'll be among the first to know when we open up beta access. We're
            currently onboarding teams on a rolling basis.
          </Text>

          {/* What to Expect */}
          <Section style={expectSection}>
            <Heading style={h2}>What happens next?</Heading>
            <Text style={listItem}>
              ✨ <strong>Priority Access:</strong> You're in line for early beta
              slots
            </Text>
            <Text style={listItem}>
              🔔 <strong>Updates:</strong> We'll keep you posted on our progress
            </Text>
            <Text style={listItem}>
              🚀 <strong>Launch:</strong> Be the first to experience Continuum
              when we're ready
            </Text>
          </Section>

          <Hr style={divider} />

          <Text style={tagline}>
            <em>Unify your work in one flow</em>
          </Text>

          <Text style={footer}>
            Continuum orchestrates Jira, GitHub, and Calendar through natural
            language in Slack.
          </Text>
        </Section>

        {/* Footer */}
        <Section style={footerSection}>
          <Text style={footerText}>© 2026 Continuum Intelligence Inc.</Text>
          <Text style={footerText}>
            This email was sent to {email} because you joined our waitlist.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default WaitlistConfirmationEmail;

// Styles matching your landing page
const main = {
  backgroundColor: "#0a0a0a",
  fontFamily:
    '"Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  padding: "40px 20px",
};

const container = {
  backgroundColor: "#141414",
  borderRadius: "16px",
  maxWidth: "600px",
  margin: "0 auto",
  border: "1px solid #2a2a2a",
};

const header = {
  padding: "40px 40px 20px",
};

const logoContainer = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const logo = {
  width: "24px",
  height: "24px",
  backgroundColor: "#ff6b35",
  borderRadius: "50%",
  display: "inline-block",
};

const brandName = {
  fontFamily: '"Fraunces", serif',
  fontSize: "24px",
  fontWeight: "700",
  color: "#f5f5f5",
  margin: "0",
  letterSpacing: "-0.02em",
};

const content = {
  padding: "0 40px 40px",
};

const h1 = {
  fontFamily: '"Fraunces", serif',
  fontSize: "42px",
  fontWeight: "500",
  color: "#f5f5f5",
  lineHeight: "1.1",
  margin: "30px 0 24px",
  letterSpacing: "-0.02em",
};

const h2 = {
  fontFamily: '"Fraunces", serif',
  fontSize: "24px",
  fontWeight: "500",
  color: "#f5f5f5",
  margin: "0 0 16px",
  letterSpacing: "-0.01em",
};

const text = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#a3a3a3",
  margin: "0 0 16px",
};

const expectSection = {
  backgroundColor: "#1a1a1a",
  borderRadius: "12px",
  padding: "24px",
  margin: "32px 0",
  border: "1px solid #2a2a2a",
};

const listItem = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#d4d4d4",
  margin: "0 0 12px",
};

const divider = {
  borderColor: "#2a2a2a",
  margin: "32px 0",
};

const tagline = {
  fontFamily: '"Fraunces", serif',
  fontSize: "20px",
  color: "#ff6b35",
  textAlign: "center" as const,
  margin: "24px 0 16px",
};

const footer = {
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#737373",
  textAlign: "center" as const,
  margin: "0",
};

const footerSection = {
  padding: "24px 40px",
  borderTop: "1px solid #2a2a2a",
};

const footerText = {
  fontSize: "12px",
  color: "#525252",
  textAlign: "center" as const,
  margin: "4px 0",
};
