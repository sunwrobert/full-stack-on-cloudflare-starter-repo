import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Product */}
          <div>
            <h3 className="mb-4 font-semibold">Product</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <a className="transition-colors hover:text-foreground" href="#">
                  Features
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-foreground" href="#">
                  Pricing
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-foreground" href="#">
                  API Docs
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-foreground" href="#">
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 font-semibold">Company</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <a className="transition-colors hover:text-foreground" href="#">
                  About
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-foreground" href="#">
                  Blog
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-foreground" href="#">
                  Careers
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-foreground" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 font-semibold">Support</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <a className="transition-colors hover:text-foreground" href="#">
                  Help Center
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-foreground" href="#">
                  Community
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-foreground" href="#">
                  Status
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-foreground" href="#">
                  Security
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 font-semibold">Legal</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <a className="transition-colors hover:text-foreground" href="#">
                  Privacy
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-foreground" href="#">
                  Terms
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-foreground" href="#">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-foreground" href="#">
                  Compliance
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="font-bold text-primary-foreground text-sm">
                SL
              </span>
            </div>
            <span className="font-semibold">SmartLinks</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2024 SmartLinks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
