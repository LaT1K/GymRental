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
            'participants' => $participants,
        ]);
    }

    public function create()
    {
        return Inertia::render('Participants/CreateParticipant');
    }

    public function store(Request $request)
    {
        // Перевірка унікальності імені тільки при створенні
        $request->validate([
            'name' => 'required|string|max:255|unique:participants,name',
            'phone' => 'required|string|size:10',
            'telegram_username' => 'required|string|max:255',
            'joined_date' => 'required|date',
        ]);

        // Зберігаємо учасника
        Participant::create($request->all());

        return redirect()->back()->with('success', 'Учасника додано успішно');
    }

    public function update(Request $request, Participant $participant)
    {
        // Валідація вхідних даних
        $request->validate([
            'name' => 'required|string|max:255', // Видалено 'unique', щоб дозволити залишати незмінне ім'я
            'phone' => 'required|string|size:10',
            'telegram_username' => 'required|string|max:255',
            'joined_date' => 'required|date',
        ]);

        // Оновлення даних учасника
        $participant->update($request->only(['name', 'phone', 'telegram_username', 'joined_date']));

        // Перенаправлення на сторінку списку учасників з повідомленням про успіх
        return redirect()->route('participants.index')->with('success', 'Учасника оновлено успішно');
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
            'participant' => $participant,
        ]);
    }

    public function destroy($id)
    {
        $participant = Participant::findOrFail($id);
        $participant->delete();

        return redirect()->route('participants.index')->with('success', 'Учасника видалено');
    }
}
