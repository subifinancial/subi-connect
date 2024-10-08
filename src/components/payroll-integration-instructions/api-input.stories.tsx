import { Button } from '../../ui/button';
import { Form } from '../../ui/form';
import ApiKeyInput from './api-input';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useForm } from 'react-hook-form';

const meta: Meta<typeof ApiKeyInput> = {
  title: 'Form Components/ApiKeyInput',
  component: ApiKeyInput,
  tags: ['autodocs'],
  decorators: [
    (): React.ReactElement => {
      const form = useForm<{ apiKey: string }>();
      const [formData, setFormData] = React.useState<string | null>(null);

      const handleOnSubmit = (data: { apiKey: string }) => {
        setFormData(JSON.stringify(data, null, 2));
      };

      const { register, handleSubmit } = form;

      return (
        <div
          id='subi-connect-payroll-integration-worflow'
          className='subi-connect sc-h-full sc-w-full sc-p-2'
        >
          <Form {...form}>
            <form
              onSubmit={handleSubmit(handleOnSubmit)}
              className='sc-flex sc-flex-col sc-gap-2'
              autoComplete='off'
            >
              <ApiKeyInput
                {...register('apiKey')}
                id='search_subi-connect-payroll-integration-worflow_apiKey'
              />
              <Button type='submit' className='sc-mt-4'>
                Finish
              </Button>

              {formData && (
                <pre className='sc-mt-4 sc-rounded sc-bg-gray-100 sc-p-2'>
                  {formData}
                </pre>
              )}
            </form>
          </Form>
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof ApiKeyInput>;

export const Default: Story = {
  name: 'Default',
};
