import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - AmeboGist NG',
  description:
    'Read the AmeboGist NG privacy policy to understand how we collect, use, and protect your personal information.',
};

const LAST_UPDATED = 'May 1, 2026';

const SECTIONS = [
  { id: 'information-we-collect', title: 'Information We Collect', icon: '📋' },
  { id: 'how-we-use', title: 'How We Use Your Information', icon: '⚙️' },
  { id: 'information-sharing', title: 'Information Sharing', icon: '🤝' },
  { id: 'cookies', title: 'Cookies & Tracking', icon: '🍪' },
  { id: 'data-security', title: 'Data Security', icon: '🔒' },
  { id: 'your-rights', title: 'Your Rights', icon: '⚖️' },
  { id: 'childrens-privacy', title: "Children's Privacy", icon: '👶' },
  { id: 'policy-changes', title: 'Changes to This Policy', icon: '📝' },
  { id: 'contact', title: 'Contact Us', icon: '📬' },
];

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <div
        style={{
          background: 'linear-gradient(135deg, #065F46 0%, #047857 55%, #059669 100%)',
        }}
        className="py-16 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4 backdrop-blur-sm">
            <span>🔒</span>
            <span>Your privacy matters to us</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            We believe in transparency. Here&apos;s exactly how AmeboGist collects, uses, and
            protects your data — in plain English (and a little Pidgin 😄).
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 text-emerald-100 text-sm px-4 py-2 rounded-lg">
            <span>📅</span>
            <span>Last updated: {LAST_UPDATED}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ background: '#FFFBEB' }} className="min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="lg:grid lg:grid-cols-4 lg:gap-12">

            {/* Sticky sidebar ToC */}
            <aside className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
                    Contents
                  </p>
                  <nav className="space-y-0.5">
                    {SECTIONS.map((s) => (
                      <a
                        key={s.id}
                        href={`#${s.id}`}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-700 py-1.5 px-2 rounded-lg hover:bg-emerald-50 transition-colors"
                      >
                        <span>{s.icon}</span>
                        <span>{s.title}</span>
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </aside>

            {/* Main content */}
            <main className="lg:col-span-3 space-y-10 mt-8 lg:mt-0">

              {/* Intro card */}
              <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-7">
                <p className="text-gray-700 leading-relaxed">
                  Welcome to <strong>AmeboGist NG</strong> (&quot;we&quot;, &quot;our&quot;, or
                  &quot;us&quot;). We are committed to protecting your personal information and your
                  right to privacy. This Privacy Policy explains how we collect, use, disclose, and
                  safeguard your information when you visit <strong>amebogist.ng</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mt-3">
                  By using our platform you agree to the collection and use of information in
                  accordance with this policy. If you disagree with any part, please discontinue
                  using our services.
                </p>
              </div>

              {/* 1. Information We Collect */}
              <section id="information-we-collect">
                <SectionHeading icon="📋" title="Information We Collect" />
                <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-7 space-y-4">
                  <SubHeading>Information you provide directly</SubHeading>
                  <ul className="space-y-2">
                    <Li>Name, email address, and password when you register an account</Li>
                    <Li>Profile details such as username, bio, and avatar</Li>
                    <Li>Comments, reactions, and other content you post</Li>
                    <Li>
                      Payment information for premium plans (processed securely by third-party
                      providers — we never store raw card details)
                    </Li>
                    <Li>Messages you send to our support team</Li>
                  </ul>

                  <SubHeading>Information collected automatically</SubHeading>
                  <ul className="space-y-2">
                    <Li>Device information (browser type, OS, device identifiers)</Li>
                    <Li>Log data (IP address, pages visited, time spent, referring URLs)</Li>
                    <Li>Usage data (articles read, searches made, features used)</Li>
                    <Li>Country/region location derived from IP address</Li>
                    <Li>Cookies and similar tracking technologies (see section 4)</Li>
                  </ul>
                </div>
              </section>

              {/* 2. How We Use */}
              <section id="how-we-use">
                <SectionHeading icon="⚙️" title="How We Use Your Information" />
                <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-7">
                  <p className="text-gray-700 mb-4">We use the information we collect to:</p>
                  <ul className="space-y-2">
                    <Li>Provide, operate, and maintain our platform and services</Li>
                    <Li>Personalise your content feed based on your interests</Li>
                    <Li>Send newsletters and notifications you have opted into</Li>
                    <Li>Process payments and manage subscriptions</Li>
                    <Li>Respond to customer support requests and resolve disputes</Li>
                    <Li>Monitor and analyse usage patterns to improve the platform</Li>
                    <Li>Detect, prevent, and address fraud, abuse, and technical issues</Li>
                    <Li>Comply with legal obligations and enforce our Terms of Service</Li>
                  </ul>
                  <div
                    className="mt-5 p-4 rounded-xl text-sm"
                    style={{ background: '#ECFDF5', borderLeft: '4px solid #065F46' }}
                  >
                    <p className="text-emerald-800">
                      <strong>We will never sell your personal data</strong> to third-party
                      advertisers or data brokers. Your trust is worth more than any quick naira.
                    </p>
                  </div>
                </div>
              </section>

              {/* 3. Information Sharing */}
              <section id="information-sharing">
                <SectionHeading icon="🤝" title="Information Sharing" />
                <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-7 space-y-4">
                  <p className="text-gray-700">
                    We may share your information only in these limited circumstances:
                  </p>
                  <ShareCard title="Service Providers" icon="🛠️">
                    Trusted vendors who help us operate the platform (hosting, payment processing,
                    email delivery, analytics). They are contractually bound to use your data only
                    as directed by us.
                  </ShareCard>
                  <ShareCard title="Legal Requirements" icon="⚖️">
                    When required by law, court order, or government authority — including
                    compliance with the Nigerian Data Protection Regulation (NDPR) and applicable
                    international regulations.
                  </ShareCard>
                  <ShareCard title="Business Transfers" icon="🏢">
                    In the event of a merger, acquisition, or sale of assets your information may
                    be transferred. You will be notified before your data becomes subject to a
                    different privacy policy.
                  </ShareCard>
                  <ShareCard title="With Your Consent" icon="✅">
                    For any other purpose, only with your explicit consent.
                  </ShareCard>
                </div>
              </section>

              {/* 4. Cookies */}
              <section id="cookies">
                <SectionHeading icon="🍪" title="Cookies & Tracking" />
                <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-7 space-y-4">
                  <p className="text-gray-700">
                    We use cookies and similar tracking technologies to enhance your experience.
                    Here is what we use:
                  </p>
                  <div className="overflow-x-auto rounded-xl border border-amber-100">
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ background: '#F0FDF4' }}>
                          <th className="text-left p-3 font-semibold text-emerald-800">Type</th>
                          <th className="text-left p-3 font-semibold text-emerald-800">Purpose</th>
                          <th className="text-left p-3 font-semibold text-emerald-800">
                            Can Opt Out
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-amber-50">
                        {[
                          ['Essential', 'Login sessions, security tokens, preferences', false],
                          [
                            'Analytics',
                            'Usage patterns and traffic sources (Google Analytics)',
                            true,
                          ],
                          ['Advertising', 'Relevant ads via Google AdSense', true],
                          ['Social', 'Facebook share buttons and embedded content', true],
                        ].map(([type, purpose, canOptOut]) => (
                          <tr key={type as string}>
                            <td className="p-3 font-medium text-gray-800">{type as string}</td>
                            <td className="p-3 text-gray-600">{purpose as string}</td>
                            <td className="p-3">
                              {canOptOut ? (
                                <span className="text-emerald-600 font-medium">Yes</span>
                              ) : (
                                <span className="text-red-500 font-medium">No</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm text-gray-500">
                    Manage cookie preferences via our cookie consent banner or your browser
                    settings.
                  </p>
                </div>
              </section>

              {/* 5. Data Security */}
              <section id="data-security">
                <SectionHeading icon="🔒" title="Data Security" />
                <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-7 space-y-3">
                  <p className="text-gray-700">
                    We implement industry-standard security measures to protect your data:
                  </p>
                  <ul className="space-y-2">
                    <Li>SSL/TLS encryption for all data in transit</Li>
                    <Li>Encrypted storage for sensitive data at rest</Li>
                    <Li>Regular security audits and vulnerability assessments</Li>
                    <Li>
                      Strict access controls — only authorised personnel can access user data
                    </Li>
                    <Li>
                      Passwords are hashed using bcrypt — we never store them in plain text
                    </Li>
                  </ul>
                  <div className="mt-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
                    <p className="text-sm text-amber-800">
                      <strong>Important:</strong> No method of internet transmission is 100%
                      secure. If you suspect a security breach affecting your account, contact us
                      immediately at{' '}
                      <a
                        href="mailto:security@amebogist.ng"
                        className="underline font-medium"
                        style={{ color: '#065F46' }}
                      >
                        security@amebogist.ng
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </section>

              {/* 6. Your Rights */}
              <section id="your-rights">
                <SectionHeading icon="⚖️" title="Your Rights" />
                <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-7">
                  <p className="text-gray-700 mb-5">
                    Under the Nigerian Data Protection Regulation (NDPR) and applicable laws, you
                    have the following rights:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <RightCard icon="👁️" title="Right to Access">
                      View all personal data we hold about you
                    </RightCard>
                    <RightCard icon="✏️" title="Right to Rectification">
                      Correct inaccurate or incomplete data
                    </RightCard>
                    <RightCard icon="🗑️" title="Right to Erasure">
                      Request deletion of your personal data
                    </RightCard>
                    <RightCard icon="📦" title="Right to Portability">
                      Receive your data in a portable format
                    </RightCard>
                    <RightCard icon="🚫" title="Right to Object">
                      Opt out of certain data processing activities
                    </RightCard>
                    <RightCard icon="⏸️" title="Right to Restrict">
                      Limit how we use your data in certain cases
                    </RightCard>
                  </div>
                  <p className="text-sm text-gray-500 mt-5">
                    To exercise any of these rights email{' '}
                    <a
                      href="mailto:privacy@amebogist.ng"
                      className="underline font-medium"
                      style={{ color: '#065F46' }}
                    >
                      privacy@amebogist.ng
                    </a>
                    . We will respond within 30 days.
                  </p>
                </div>
              </section>

              {/* 7. Children's Privacy */}
              <section id="childrens-privacy">
                <SectionHeading icon="👶" title="Children's Privacy" />
                <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-7">
                  <p className="text-gray-700">
                    AmeboGist is not directed to children under the age of <strong>13</strong>. We
                    do not knowingly collect personal information from children under 13. If you are
                    a parent or guardian and believe your child has provided us with personal data,
                    please contact{' '}
                    <a
                      href="mailto:privacy@amebogist.ng"
                      className="underline font-medium"
                      style={{ color: '#065F46' }}
                    >
                      privacy@amebogist.ng
                    </a>{' '}
                    and we will delete that information promptly.
                  </p>
                </div>
              </section>

              {/* 8. Policy Changes */}
              <section id="policy-changes">
                <SectionHeading icon="📝" title="Changes to This Policy" />
                <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-7">
                  <p className="text-gray-700">
                    We may update this Privacy Policy to reflect changes in our practices,
                    technology, or legal requirements. When we make significant changes, we will:
                  </p>
                  <ul className="space-y-2 mt-4">
                    <Li>Update the &quot;Last Updated&quot; date at the top of this page</Li>
                    <Li>
                      Notify registered users via email or an in-app notification
                    </Li>
                    <Li>Post a prominent notice on our homepage for 30 days</Li>
                  </ul>
                  <p className="text-gray-700 mt-4">
                    Continued use of our platform after changes become effective constitutes
                    acceptance of the revised policy.
                  </p>
                </div>
              </section>

              {/* 9. Contact */}
              <section id="contact">
                <SectionHeading icon="📬" title="Contact Us" />
                <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-7">
                  <p className="text-gray-700 mb-5">
                    If you have any questions, concerns, or requests regarding this Privacy Policy,
                    please reach out:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <ContactCard
                      icon="📧"
                      label="Email"
                      value="privacy@amebogist.ng"
                      href="mailto:privacy@amebogist.ng"
                    />
                    <ContactCard
                      icon="📞"
                      label="Phone"
                      value="+234 913 834 9271"
                      href="tel:+2349138349271"
                    />
                    <ContactCard icon="📍" label="Address" value="Lagos, Nigeria" />
                  </div>
                </div>
              </section>

              {/* Footer note */}
              <div className="text-center text-sm text-gray-400 pb-8">
                <p>
                  This Privacy Policy was last updated on <strong>{LAST_UPDATED}</strong>.
                </p>
                <p className="mt-1">
                  For our full Terms of Service, visit{' '}
                  <a
                    href="/terms"
                    className="underline hover:text-emerald-700 transition-colors"
                    style={{ color: '#065F46' }}
                  >
                    amebogist.ng/terms
                  </a>
                  .
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Helper components ──────────────────────────────────────────── */

function SectionHeading({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-2xl">{icon}</span>
      <h2 className="text-xl font-bold" style={{ color: '#065F46' }}>
        {title}
      </h2>
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-semibold text-gray-800 mt-4 mb-2">{children}</h3>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-gray-700">
      <span className="mt-1 flex-shrink-0" style={{ color: '#065F46' }}>
        •
      </span>
      <span>{children}</span>
    </li>
  );
}

function ShareCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3 p-4 rounded-xl bg-amber-50 border border-amber-100">
      <span className="text-xl flex-shrink-0 mt-0.5">{icon}</span>
      <div>
        <p className="font-semibold text-gray-800 mb-1">{title}</p>
        <p className="text-sm text-gray-600">{children}</p>
      </div>
    </div>
  );
}

function RightCard({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3 p-4 rounded-xl border border-amber-100 hover:border-emerald-200 hover:bg-emerald-50 transition-colors">
      <span className="text-xl flex-shrink-0">{icon}</span>
      <div>
        <p className="font-semibold text-gray-800 text-sm">{title}</p>
        <p className="text-xs text-gray-500 mt-0.5">{children}</p>
      </div>
    </div>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: string;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="text-center p-4 rounded-xl bg-amber-50 border border-amber-100">
      <span className="text-2xl block mb-2">{icon}</span>
      <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{label}</p>
      {href ? (
        <a
          href={href}
          className="text-sm font-medium hover:text-emerald-700 transition-colors"
          style={{ color: '#065F46' }}
        >
          {value}
        </a>
      ) : (
        <p className="text-sm font-medium text-gray-700">{value}</p>
      )}
    </div>
  );
}
