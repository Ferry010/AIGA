import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Hr, Html, Img, Link, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Ferry van AI Geletterdheid Academy"
const LOGO_URL = "https://aigeletterdheid.academy/assets/AIGA_transparent-CxHDVoMM.png"

interface DocumentDownloadProps {
  voornaam?: string
  documentType?: 'checklist' | 'template'
}

const documentLabels: Record<string, string> = {
  checklist: 'AI Act Compliance Checklist',
  template: 'AI-beleid Template',
}

const documentUrls: Record<string, string> = {
  checklist: 'https://aigeletterdheid.academy/tools/downloads/ai-act-compliance-checklist/document',
  template: 'https://aigeletterdheid.academy/tools/downloads/ai-beleid-opstellen/document',
}

const DocumentDownloadEmail = ({ voornaam, documentType = 'checklist' }: DocumentDownloadProps) => {
  const docLabel = documentLabels[documentType] || documentLabels.checklist
  const docUrl = documentUrls[documentType] || documentUrls.checklist

  return (
    <Html lang="nl" dir="ltr">
      <Head />
      <Preview>Je {docLabel} staat klaar!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Img src={LOGO_URL} alt="AI Geletterdheid Academy" width="100" height="auto" style={logoImg} />
          </Section>

          <Heading style={h1}>
            {voornaam ? `Hoi ${voornaam}!` : 'Hoi!'}
          </Heading>

          <Text style={text}>
            Leuk dat je de <strong>{docLabel}</strong> hebt aangevraagd. Ik heb hem hieronder voor je klaargezet.
          </Text>

          <Text style={text}>
            Met dit document kun je direct aan de slag. Heb je vragen of wil je even sparren over hoe je dit het beste kunt toepassen binnen jouw organisatie? Stuur me gerust een berichtje — ik help je graag verder.
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href={docUrl}>
              Bekijk het document →
            </Button>
          </Section>

          <Text style={text}>
            Groet,<br />
            Ferry
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            AI Geletterdheid Academy · AI-geletterdheid voor organisaties
          </Text>
          <Text style={footerContact}>
            <Link href="https://aigeletterdheid.academy" style={footerLink}>aigeletterdheid.academy</Link>
            {' · '}aanvraag@aigeletterdheid.academy{' · '}+31 (0)10 316 7827
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: DocumentDownloadEmail,
  subject: (data: Record<string, any>) => {
    const label = documentLabels[data?.documentType] || 'document'
    return `Je ${label} staat klaar!`
  },
  displayName: 'Document download',
  previewData: { voornaam: 'Jan', documentType: 'checklist' },
} satisfies TemplateEntry

// Styles — branded gradient: teal #468C94 → pink #E0337A
const main = { backgroundColor: '#ffffff', fontFamily: "'Segoe UI', Arial, sans-serif" }
const container = { padding: '32px 24px', maxWidth: '560px', margin: '0 auto' }
const logoSection = { marginBottom: '24px' }
const logoImg = { display: 'block' as const }
const h1 = { fontSize: '22px', fontWeight: '700' as const, color: '#1a2332', margin: '0 0 16px' }
const text = { fontSize: '15px', color: '#3d4654', lineHeight: '1.6', margin: '0 0 16px' }
const buttonContainer = { textAlign: 'center' as const, margin: '24px 0' }
const button = {
  backgroundColor: '#468C94',
  background: 'linear-gradient(to right, #468C94, #E0337A)',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: '600' as const,
  padding: '12px 28px',
  borderRadius: '8px',
  textDecoration: 'none',
  display: 'inline-block',
}
const hr = { borderColor: '#e5e7eb', margin: '32px 0 16px' }
const footer = { fontSize: '13px', color: '#6b7280', margin: '0 0 4px' }
const footerContact = { fontSize: '12px', color: '#9ca3af', margin: '0' }
const footerLink = { color: '#468C94', textDecoration: 'underline' }
