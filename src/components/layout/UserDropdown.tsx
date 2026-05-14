"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LogOut,
  LayoutDashboard,
  User as UserIcon,
  Settings,
  CreditCard,
} from "lucide-react";

interface UserDropdownProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    plan?: string | null;
  };
}

export function UserDropdown({ user }: UserDropdownProps) {
  const router = useRouter();

  const userInitials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
    : "U";

  const handleLogout = async () => {
    // FIX: Use window.location.origin so logout redirects to the CURRENT origin,
    // not NEXTAUTH_URL (which may point to a different port like 3000 in dev).
    await signOut({ redirect: true, callbackUrl: `${window.location.origin}/` });
  };

  return (
    <DropdownMenu>
      {/* 
        FIX: Using DropdownMenuTrigger WITHOUT asChild.
        The base-ui trigger's `render` prop conflicted with Button's event
        handlers, causing the dropdown to immediately close (flicker).
        We style the trigger directly to match the old Button appearance.
      */}
      <DropdownMenuTrigger
        className="relative size-10 rounded-full p-0 overflow-hidden border border-primary-foreground/20 hover:bg-primary-foreground/10 transition-colors bg-transparent cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/30"
        aria-label="Open user menu"
      >
        <Avatar className="size-full">
          <AvatarImage src={user.image || ""} alt={user.name || "User"} />
          <AvatarFallback className="bg-primary-foreground text-primary font-bold text-sm">
            {userInitials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 rounded-2xl p-2 shadow-2xl mt-2"
        align="end"
        sideOffset={12}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal px-2 py-2">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-bold leading-none">
                {user.name || "User"}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
              <div className="mt-2">
                <span
                  className={`text-[10px] uppercase font-black px-2.5 py-1 rounded-full inline-block ${
                    user.plan === "pro"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {user.plan || "free"} Plan
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* FIX: Using onClick + router.push() instead of asChild+Link.
            base-ui's DropdownMenuItem render prop pattern swallows Link's
            click events, preventing navigation. */}
        <DropdownMenuItem
          className="rounded-lg cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
          <LayoutDashboard className="mr-2 size-4" />
          <span>Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="rounded-lg cursor-pointer"
          onClick={() => router.push("/profile")}
        >
          <UserIcon className="mr-2 size-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="rounded-lg cursor-pointer"
          onClick={() => router.push("/settings")}
        >
          <Settings className="mr-2 size-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="rounded-lg cursor-pointer"
          onClick={() => router.push("/pricing")}
        >
          <CreditCard className="mr-2 size-4" />
          <span>Subscription</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="rounded-lg cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 size-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
