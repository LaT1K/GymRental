import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import ParticipantList from '@/Components/ParticipantList';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const IndexParticipants = () => {
    const { participants } = usePage().props;

    return (
        <AuthenticatedLayout>
            <>  
                <Head title="Список учасників" />
                <div className="container mx-auto mt-8">
                    <ParticipantList participants={participants} />
                    <Link href="/participants/create" className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded">
                        Додати учасника
                    </Link>
                </div>
            </>
        </AuthenticatedLayout>
        
    );
};

export default IndexParticipants;
