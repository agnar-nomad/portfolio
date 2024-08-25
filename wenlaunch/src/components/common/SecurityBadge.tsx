import React from 'react';

interface BadgeProps {
  status: boolean
  children: string | JSX.Element
  hint?: string
}

export default function SecurityBadge({ status, children, hint }: BadgeProps): JSX.Element {

  const badgeColor = status ? 'success' : 'error'

  return (
    <div className={`tooltip tooltip-top grid place-items-center cursor-help`} data-tip={hint}>
      <span className={`badge badge-${badgeColor} badge-outline pointer-events-none `}>
        {children}
      </span>
    </div>
  );
};