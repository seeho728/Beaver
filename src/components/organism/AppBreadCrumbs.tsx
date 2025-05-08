"use client";

import { Slash } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

export const AppBreadCrumbs = () => {
  const pathname = usePathname();

  const histories = useMemo(() => {
    const segments = pathname
      .split("/")
      .filter(Boolean)
      .map((segment) => decodeURIComponent(segment.toLowerCase()));

    return ["home", ...segments];
  }, [pathname]);

  const buildHref = (index: number) => {
    if (index === 0) return "/";
    const path = "/" + histories.slice(1, index + 1).join("/");
    return path;
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {histories.map((history, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink href={buildHref(index)}>{history}</BreadcrumbLink>
            {index < histories.length - 1 && (
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
