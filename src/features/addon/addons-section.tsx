'use client';

import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Container,
  KeyRound,
  Palette,
  PlayCircle,
  Shield,
  Workflow,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface Feature {
  badge: string;
  color: string;
  description: string;
  details: string[];
  hoverColor: string;
  icon: React.ComponentType<{ className?: string }>;
  id: string;
  shimmerColor: string;
  title: string;
}

const features: Feature[] = [
  {
    badge: 'Security',
    color: 'text-emerald-700 dark:text-emerald-300',
    description:
      'CSP with nonce-based security, comprehensive headers protection',
    details: [
      'Content Security Policy with nonce',
      'X-Frame-Options, X-XSS-Protection',
      'Referrer-Policy strict enforcement',
      'Permissions-Policy controls',
    ],
    hoverColor:
      'bg-emerald-50 dark:bg-emerald-900/40 border-emerald-200 dark:border-emerald-700/60',
    icon: Shield,
    id: 'security',
    shimmerColor:
      'from-emerald-200/25 via-emerald-100/15 to-emerald-200/25 dark:from-emerald-400/15 dark:via-emerald-300/8 dark:to-emerald-400/15',
    title: 'A+ Security Headers',
  },
  {
    badge: 'DevOps',
    color: 'text-blue-600 dark:text-blue-400',
    description:
      'BuildKit secrets, multi-stage optimization, standalone output',
    details: [
      'BuildKit secret mounts for API keys',
      'Multi-stage optimized builds',
      'Standalone output for production',
      'pnpm workspace optimization',
    ],
    hoverColor:
      'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/50',
    icon: Container,
    id: 'docker',
    shimmerColor:
      'from-blue-200/20 via-blue-100/10 to-blue-200/20 dark:from-blue-400/10 dark:via-blue-300/5 dark:to-blue-400/10',
    title: 'Docker-Ready',
  },
  {
    badge: 'CI/CD',
    color: 'text-violet-600 dark:text-violet-400',
    description: 'Complete quality assurance pipeline with automated workflows',
    details: [
      'Custom ESLint configuration with 10+ plugins',
      'Snyk security vulnerability scanning',
      'Automated Docker image publishing',
      'GitHub Actions CI/CD pipeline',
    ],
    hoverColor:
      'bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-800/50',
    icon: Workflow,
    id: 'quality',
    shimmerColor:
      'from-violet-200/20 via-violet-100/10 to-violet-200/20 dark:from-violet-400/10 dark:via-violet-300/5 dark:to-violet-400/10',
    title: 'Quality Assurance',
  },
  {
    badge: 'TypeScript',
    color: 'text-indigo-600 dark:text-indigo-400',
    description: 'T3-env with validation, build-time type checking',
    details: [
      'Runtime environment validation',
      'Build-time type checking',
      'Separate client/server env vars',
      'Zod schema validation',
    ],
    hoverColor:
      'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800/50',
    icon: KeyRound,
    id: 'env',
    shimmerColor:
      'from-indigo-200/20 via-indigo-100/10 to-indigo-200/20 dark:from-indigo-400/10 dark:via-indigo-300/5 dark:to-indigo-400/10',
    title: 'Typesafe Environment',
  },
  {
    badge: 'Styling',
    color: 'text-teal-600 dark:text-teal-400',
    description: 'Next-generation CSS framework with advanced theming',
    details: [
      'Latest Tailwind v4 features',
      'Custom design system variables',
      'Dark/light theme integration',
      'Advanced animation utilities',
    ],
    hoverColor:
      'bg-teal-50 dark:bg-teal-950/30 border-teal-200 dark:border-teal-800/50',
    icon: Palette,
    id: 'tailwind',
    shimmerColor:
      'from-teal-200/20 via-teal-100/10 to-teal-200/20 dark:from-teal-400/10 dark:via-teal-300/5 dark:to-teal-400/10',
    title: 'Tailwind CSS v4',
  },
  {
    badge: 'Testing',
    color: 'text-orange-600 dark:text-orange-400',
    description: 'Comprehensive testing suite with accessibility validation',
    details: [
      'Playwright end-to-end testing',
      'Automated accessibility scanning',
      'Cross-browser compatibility tests',
      'CI/CD integrated test pipeline',
    ],
    hoverColor:
      'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800/50',
    icon: PlayCircle,
    id: 'testing',
    shimmerColor:
      'from-orange-200/20 via-orange-100/10 to-orange-200/20 dark:from-orange-400/10 dark:via-orange-300/5 dark:to-orange-400/10',
    title: 'End-to-End Tests',
  },
];

export const FeaturesSection = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | undefined>();

  return (
    <section className="py-7">
      <div className="mb-8 text-center">
        <h2 className="mb-4 text-4xl font-bold">Template Features</h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          Built with enterprise-grade tools and modern best practices for
          production-ready applications
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <button
            className={cn(
              'group relative cursor-pointer overflow-hidden rounded-xl border p-6 text-left transition-all duration-300',
              'hover:scale-[1.02] hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5',
              selectedFeature === feature.id
                ? `scale-[1.02] shadow-lg shadow-black/10 dark:shadow-white/10 ${feature.hoverColor}`
                : `hover:${feature.hoverColor}`,
            )}
            key={feature.id}
            onClick={() =>
              setSelectedFeature(
                selectedFeature === feature.id ? undefined : feature.id,
              )
            }
          >
            <div
              className={cn(
                'absolute inset-0 opacity-0 transition-opacity duration-500',
                'animate-[shimmer_3s_ease-in-out_infinite] bg-gradient-to-r bg-[length:200%_100%]',
                `bg-gradient-to-r ${feature.shimmerColor}`,
                'group-hover:opacity-100',
              )}
              style={{
                animation: 'shimmer 3s ease-in-out infinite',
                backgroundSize: '200% 100%',
              }}
            />

            <div
              className={cn(
                'absolute inset-0 rounded-xl opacity-0 transition-all duration-300',
                'bg-gradient-radial from-current/5 via-transparent to-transparent',
                feature.color,
                'group-hover:opacity-100',
              )}
            />

            <div className="relative z-10">
              <div className="mb-4 flex items-start justify-between">
                <div
                  className={cn(
                    'rounded-lg border p-3 transition-all duration-300',
                    'bg-background/80 backdrop-blur-sm',
                    'group-hover:bg-background/90 group-hover:shadow-sm',
                    `group-hover:border-current/20 group-hover:${feature.color.replace('text-', 'shadow-')}`,
                  )}
                >
                  <feature.icon
                    className={cn(
                      'h-6 w-6 transition-all duration-300',
                      feature.color,
                    )}
                  />
                </div>
                <Badge
                  className="relative z-10 text-xs backdrop-blur-sm"
                  variant="secondary"
                >
                  {feature.badge}
                </Badge>
              </div>

              <h3
                className={cn(
                  'mb-2 text-xl font-semibold transition-all duration-300',
                  `group-hover:${feature.color}`,
                )}
              >
                {feature.title}
              </h3>

              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                {feature.description}
              </p>

              <div
                className={cn(
                  'space-y-2 overflow-hidden transition-all duration-300',
                  selectedFeature === feature.id
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0',
                )}
              >
                {feature.details.map((detail, i) => (
                  <div
                    className="text-muted-foreground flex items-center text-sm"
                    key={`feature-${detail}-${i}`}
                  >
                    <div
                      className={cn(
                        'mr-1.5 h-1.5 w-1.5 rounded-full transition-colors duration-300',
                        feature.color.split(' ')[0].replace('text-', 'bg-'),
                        'dark:' +
                          feature.color.split(' ')[1].replace('text-', 'bg-'),
                      )}
                    />
                    {detail}
                  </div>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-6 text-center">
        <div className="bg-muted/50 text-muted-foreground inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm backdrop-blur-sm">
          <PlayCircle className="h-4 w-4" />
          Production-ready template with enterprise features
        </div>

        <div className="space-y-3">
          <div className="text-muted-foreground flex justify-center gap-1 text-sm">
            <p>Created by</p>
            <span className="text-foreground font-semibold">Yukasama</span>
          </div>

          <Link
            className={cn(
              'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm',
              'bg-background hover:bg-muted/50 border transition-all duration-200',
              'text-muted-foreground hover:text-foreground hover:scale-105 hover:shadow-sm',
            )}
            href="https://github.com/Yukasama/nextjs-template"
            prefetch={false}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icons.Github className="h-5 w-5 dark:invert" />
            View Source Code
          </Link>
        </div>
      </div>
    </section>
  );
};
