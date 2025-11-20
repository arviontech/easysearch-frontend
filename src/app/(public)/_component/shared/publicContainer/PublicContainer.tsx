import { cn } from "@/utils/utils";

interface PublicContainerProps {
  children: React.ReactNode;
  className?: string;
}

const PublicContainer = ({ children, className }: PublicContainerProps) => {
  return (
    <div className={cn('w-full max-w-[1440px] mx-auto px-4 lg:px-6', className)}>
      {children}
    </div>
  );
};

export default PublicContainer;
