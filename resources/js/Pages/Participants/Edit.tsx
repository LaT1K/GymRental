import React from 'react';
import { Head } from '@inertiajs/react';
import { Link, usePage, useForm, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import DeleteButton from '@/Components/Button/DeleteButton';
import LoadingButton from '@/Components/Button/LoadingButton';
import TextInput from '@/Components/Form/TextInput';
import SelectInput from '@/Components/Form/SelectInput';
import TrashedMessage from '@/Components/Messages/TrashedMessage';
import { Participant, Organization } from '@/types';
import FieldGroup from '@/Components/Form/FieldGroup';

const Edit = () => {
  const { participant } = usePage<{
    participant: Participant;
  }>().props;

  const { data, setData, errors, put, processing } = useForm({
    name: participant.name || '',
    phone: participant.phone || '',
    telegram_username: participant.telegram_username || '',
    joined_date: participant.joined_date || '',
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    put(route('participants.update', participant.id));
  }

  function destroy() {
    if (confirm('Are you sure you want to delete this participant?')) {
      router.delete(route('participants.destroy', participant.id));
    }
  }

  function restore() {
    if (confirm('Are you sure you want to restore this participant?')) {
      router.put(route('participants.restore', participant.id));
    }
  }

  return (
    <div>
      <Head title={`${participant.name}`} />
      <h1 className="mb-8 text-3xl font-bold">
        <Link
          href={route('participants.index')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Participants
        </Link>
        <span className="mx-2 font-medium text-indigo-600">/</span>
        {participant.name}
      </h1>
      <div className="overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 p-8 lg:grid-cols-3">
            <FieldGroup
              label="Name"
              name="name"
              error={errors.name}
            >
              <TextInput
                name="name"
                error={errors.name}
                value={data.name}
                onChange={e => setData('name', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup
              label="Phone"
              name="phone"
              error={errors.phone}
            >
              <TextInput
                name="phone"
                error={errors.phone}
                value={data.phone}
                onChange={e => setData('phone', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup label="Telegram link" name="telegram_username" error={errors.telegram_username}>
              <TextInput
                name="telegram_username"
                type="text"
                error={errors.telegram_username}
                value={data.telegram_username}
                onChange={e => setData('telegram_username', e.target.value)}
              />
            </FieldGroup>
          </div>
          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={processing}
              type="submit"
              className="ml-auto btn-indigo"
            >
              Update Participant
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */
Edit.layout = (page: React.ReactNode) => <MainLayout children={page} />;

export default Edit;
