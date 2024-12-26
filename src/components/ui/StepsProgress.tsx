import React from 'react';

interface Step {
  name: string;
  href: string;
  status: 'complete' | 'current' | 'upcoming';
}

interface StepsProgressProps {
  steps: Step[];
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const StepsProgress: React.FC<StepsProgressProps> = ({ steps }) => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step: Step, stepIdx: number) => (
          <li key={step.name} className={classNames(stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '', 'relative')}>
            {step.status === 'complete' ? (
              <>
                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                  <div className="h-0.5 w-full bg-indigo-600" />
                </div>
                <a
                  href={step.href}
                  className="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white font-bold hover:bg-indigo-900"
                >
                  {stepIdx + 1}
                  <span className="sr-only">{step.name}</span>
                </a>
              </>
            ) : step.status === 'current' ? (
              <>
                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <a
                  href={step.href}
                  aria-current="step"
                  className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white font-bold text-indigo-600"
                >
                  {stepIdx + 1}
                  <span className="sr-only">{step.name}</span>
                </a>
              </>
            ) : (
              <>
                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <a
                  href={step.href}
                  className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white font-bold text-gray-400 hover:border-gray-400 hover:text-gray-600"
                >
                  {stepIdx + 1}
                  <span className="sr-only">{step.name}</span>
                </a>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export const StepsProgressShow: React.FC = () => {
  const steps: Step[] = [
    { name: 'Step 1', href: '#', status: 'complete' },
    { name: 'Step 2', href: '#', status: 'complete' },
    { name: 'Step 3', href: '#', status: 'current' },
    { name: 'Step 4', href: '#', status: 'upcoming' },
    { name: 'Step 5', href: '#', status: 'upcoming' },
  ];

  return (
    <div className="p-4">
      <StepsProgress steps={steps} />
    </div>
  );
};
