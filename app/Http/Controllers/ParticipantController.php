<?php

namespace App\Http\Controllers;

use App\Models\Participant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ParticipantController extends Controller
{
    public function index()
    {
        $participants = Participant::all();
        return Inertia::render('Participants/IndexParticipants', [
            'participants' => $participants
        ]);
    }

    public function create()
    {
        return Inertia::render('Participants/CreateParticipant');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'phone' => 'nullable|string',
            'telegram_username' => 'nullable|string',
            'joined_date' => 'required|date',
        ]);

        Participant::create($request->all());

        return redirect()->route('participants.index')->with('success', 'Учасника успішно додано');
    }

    public function show($id)
    {
        $participant = Participant::findOrFail($id);
        return view('participants.show', compact('participant'));
    }

    public function edit($id)
    {
        $participant = Participant::findOrFail($id);
        return Inertia::render('Participants/EditParticipantForm', [
            'participant' => $participant
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string',
            'phone' => 'nullable|string',
            'telegram_username' => 'nullable|string',
            'joined_date' => 'required|date',
        ]);

        $participant = Participant::findOrFail($id);
        $participant->update($request->all());

        return redirect()->route('participants.index')->with('success', 'Інформація про учасника оновлена');
    }

    public function destroy($id)
    {
        $participant = Participant::findOrFail($id);
        $participant->delete();

        return redirect()->route('participants.index')->with('success', 'Учасника видалено');
    }
}
