import { Button } from '@/components/ui/button';
import { Inputs } from '@/components';
import { FormStateType } from '@/types';
import { cn } from '@/lib/utils';

interface Props {
  formState: FormStateType;
  setFormState: (state: Partial<FormStateType>) => void;
  isLoading: boolean;
  handleSave: () => Promise<void>;
  className?: string;
}

const InputSection = ({
  formState,
  setFormState,
  isLoading,
  handleSave,
  className,
}: Props) => {
  return (
    <div className={cn('flex flex-col w-full md:max-w-sm', className)}>
      <Inputs
        fullName={formState.fullName}
        email={formState.email}
        onFullNameChange={name => setFormState({ fullName: name })}
        onEmailChange={email => setFormState({ email })}
        className="gap-6"
      />
      <Button
        variant="default"
        size="lg"
        disabled={isLoading}
        className="w-full max-w-md mt-8 bg-black hover:bg-gray-800 text-white font-space-grotesk rounded-lg"
        onClick={handleSave}
      >
        Save
      </Button>
    </div>
  );
};

export default InputSection;
