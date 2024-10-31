<?php

namespace App\Http\Controllers;

use App\Models\Participant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ParticipantController extends Controller
{
    public function create()
    {
        return Inertia::render('Participants/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'telegram_username' => 'nullable|string|max:255',
            'joined_date' => 'required|date',
        ]);

        Participant::create($request->all());

        return redirect()->route('participants.create')->with('success', 'Participant added successfully.');
    }
}
