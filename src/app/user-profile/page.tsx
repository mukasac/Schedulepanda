"use client";

import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => {
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
      />
    </div>
  );
};

export default UserProfilePage;
