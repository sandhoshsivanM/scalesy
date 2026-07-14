interface TickedRuleProps {
  className?: string;
}

/** Hairline with evenly spaced gold measurement ticks. `.rule-ticked`. */
export function TickedRule({ className = '' }: TickedRuleProps) {
  return <div className={`rule-ticked ${className}`.trim()} aria-hidden="true" />;
}
