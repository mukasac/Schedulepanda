"use client";

import { UserProfile } from "@clerk/nextjs";

const SecuritySettingsPage = () => {
  return (
    <div className="container mx-auto py-10">
      <UserProfile 
        appearance={{
          elements: {
            rootBox: "mx-auto max-w-3xl",
            card: "shadow-none",
            navbar: "hidden",
            pageScrollBox: "p-8",
            accordionTriggerButton: "hover:bg-muted/50",
          }
        }}
        path="/security"
      />
    </div>
  );
};

export default SecuritySettingsPage;