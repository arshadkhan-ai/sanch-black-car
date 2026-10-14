import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        gold: "bg-gold text-ink hover:bg-gold-deep",
        outline: "border border-white/50 bg-transparent text-white hover:bg-white/10",
        outlineDark: "border border-gold/50 bg-transparent text-gold-ink hover:bg-gold/10",
        dark: "bg-ink text-white hover:bg-charcoal",
        ghost: "bg-transparent text-white hover:bg-white/10",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs tracking-wide",
        lg: "h-12 px-7",
      },
    },
    defaultVariants: { variant: "gold", size: "default" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
