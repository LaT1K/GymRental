import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import ParticipantForm from '@/Components/ParticipantForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const CreateParticipant = () => {
    const { post } = useForm({
        name: '',
        phone: '',
        telegram_username: '',
        joined_date: '',
    });

    const handleSubmit = (data) => {
        post('/participants', data);
    };

    return (
        <AuthenticatedLayout>
            <>
                <Head title="Додати учасника" />
                <div className="container mx-auto mt-8">
                    <ParticipantForm onSubmit={handleSubmit} />
                </div>
            </>
        </AuthenticatedLayout>
        
    );
};

export default CreateParticipant;
