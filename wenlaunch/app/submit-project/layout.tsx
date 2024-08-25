import { ClerkProvider } from '@clerk/nextjs'

export default function SubmiProjectPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='grid mx-auto p-2 max-w-7xl'>
      <ClerkProvider appearance={{
        elements: {
          card: "bg-base-200",
          headerTitle: {
            color: "oklch(var(--bc))"
          },
          headerSubtitle: {
            color: "oklch(var(--bc))",
            opacity: "75%"
          },
          socialButtonsBlockButton: {
            color: "oklch(var(--bc))"
          },
          footerActionText: {
            color: "oklch(var(--bc))"
          },
          modalCloseButton: {
            color: "oklch(var(--bc))"
          },
          userPreviewMainIdentifier: {
            color: "oklch(var(--bc))"
          },
          userPreviewSecondaryIdentifier: {
            color: "oklch(var(--bc))"
          },
          userButtonPopoverActionButtonText: {
            color: "oklch(var(--bc))"
          },
          navbarButton: {
            color: "oklch(var(--bc))"
          },
          profileSectionTitleText: {
            color: "oklch(var(--bc))"
          },
          profileSectionPrimaryButton: {
            color: "oklch(var(--bc))"
          },
        },
      }}>
        {children}
      </ClerkProvider>
    </main>
  );
}
