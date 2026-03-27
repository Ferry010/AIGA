import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "AIGA Academy"

interface DocumentDownloadProps {
  voornaam?: string
  documentType?: 'checklist' | 'template'
}

const documentLabels: Record<string, string> = {
  checklist: 'AI Act Compliance Checklist',
  template: 'AI-beleid Template',
}

const documentUrls: Record<string, string> = {
  checklist: 'https://aiganl.lovable.app/tools/downloads/ai-act-compliance-checklist/document',
  template: 'https://aiganl.lovable.app/tools/downloads/ai-beleid-opstellen/document',
}

const DocumentDownloadEmail = ({ voornaam, documentType = 'checklist' }: DocumentDownloadProps) => {
  const docLabel = documentLabels[documentType] || documentLabels.checklist
  const docUrl = documentUrls[documentType] || documentUrls.checklist

  return (
    <Html lang="nl" dir="ltr">
      <Head />
      <Preview>Je {docLabel} van {SITE_NAME}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Text style={logoText}>AIGA Academy</Text>
          </Section>

          <Heading style={h1}>
            {voornaam ? `Hoi ${voornaam},` : 'Hoi,'}
          </Heading>

          <Text style={text}>
            Bedankt voor je interesse in de <strong>{docLabel}</strong>. Hierbij ontvang je het document zodat je het altijd bij de hand hebt.
          </Text>

          <Text style={text}>
            Klik op de knop hieronder om het document te bekijken:
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href={docUrl}>
              Bekijk het document →
            </Button>
          </Section>

          <Text style={text}>
            Heb je vragen over de AI Act of wil je weten hoe jouw organisatie AI-geletterd kan worden? Neem gerust contact met ons op.
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            {SITE_NAME} — AI-geletterdheid voor organisaties
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
    return `Je ${label} van ${SITE_NAME}`
  },
  displayName: 'Document download',
  previewData: { voornaam: 'Jan', documentType: 'checklist' },
} satisfies TemplateEntry

// Styles — AIGA teal primary: hsl(189, 35%, 42%) ≈ #468C94
const main = { backgroundColor: '#ffffff', fontFamily: "'Segoe UI', Arial, sans-serif" }
const container = { padding: '32px 24px', maxWidth: '560px', margin: '0 auto' }
const logoSection = { marginBottom: '24px' }
const logoText = { fontSize: '20px', fontWeight: '700' as const, color: '#468C94', margin: '0' }
const h1 = { fontSize: '22px', fontWeight: '700' as const, color: '#1a2332', margin: '0 0 16px' }
const text = { fontSize: '15px', color: '#3d4654', lineHeight: '1.6', margin: '0 0 16px' }
const buttonContainer = { textAlign: 'center' as const, margin: '24px 0' }
const button = {
  backgroundColor: '#468C94',
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
