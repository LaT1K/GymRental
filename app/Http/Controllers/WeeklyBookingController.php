<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WeeklyBooking;
use App\Models\GamePeriod;
use App\Models\Participant;
use Inertia\Inertia;

class WeeklyBookingController extends Controller
{
    public function index(GamePeriod $game_period)
    {
        $bookings = WeeklyBooking::where('period_id', $game_period->id)
                    ->with('participant') 
                    ->get();

        $participants = Participant::all();

        return Inertia::render('WeeklyBookings/Index', [
            'gamePeriod' => $game_period,
            'bookings' => $bookings,
            'participants' => $participants,
        ]);
    }

    public function store(Request $request, GamePeriod $game_period)
    {
        $request->validate([
            'participant_ids' => 'required|array',
            'participant_ids.*' => 'exists:participants,id',
        ]);

        foreach ($request->participant_ids as $participantId) {
            WeeklyBooking::create([
                'period_id' => $game_period->id,
                'participant_id' => $participantId,
                'day_of_week' => 'Monday', 
                'start_time' => '19:00', 
                'end_time' => '21:00', 
                'booking_type' => '-', 
                'fixed_price' => '-', 
            ]);
        }

        return redirect()->route('weekly_bookings.index', ['game_period' => $game_period->id])
                        ->with('message', 'Гравці успішно додані до бронювання.');
    }


    public function destroy($id)
    {
        $booking = WeeklyBooking::findOrFail($id);
        $booking->delete();

        return redirect()->back()->with('message', 'Бронювання успішно видалено.');
    }
}
