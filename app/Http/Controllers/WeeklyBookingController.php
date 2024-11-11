<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WeeklyBooking;
use App\Models\GamePeriod;
use App\Models\Participant;
use App\Models\Schedule;
use App\Models\Price;
use Inertia\Inertia;

class WeeklyBookingController extends Controller
{
    public function index(GamePeriod $game_period)
    {
        $bookings = WeeklyBooking::where('period_id', $game_period->id)
            ->with('participant')
            ->get();

        $participants = Participant::all();
        $schedules = Schedule::where('period_id', $game_period->id)->get();
        $pricing = Price::all();

        return Inertia::render('WeeklyBookings/Index', [
            'gamePeriod' => $game_period,
            'bookings' => $bookings,
            'participants' => $participants,
            'schedules' => $schedules,
            'pricing' => $pricing,
        ]);
    }

    public function store(Request $request, GamePeriod $game_period)
{
    $request->validate([
        'participant_ids' => 'required|array',
        'participant_ids.*' => 'exists:participants,id',
        'schedule_id' => 'required|exists:schedule,id',
        'pricing_types' => 'required|array',
    ]);

    $schedule = Schedule::find($request->schedule_id);

    foreach ($request->participant_ids as $participantId) {
        $existingBooking = WeeklyBooking::where('period_id', $game_period->id)
            ->where('participant_id', $participantId)
            ->where('schedule_id', $request->schedule_id)
            ->first();

        if ($existingBooking) {
            continue;
        }

        $pricingType = $request->pricing_types[$participantId] ?? 'one_time';

        $priceRecord = Price::where('booking_type', $schedule->booking_type)
            ->where('pricing_type', $pricingType)
            ->first();

        if (!$priceRecord) {
            return redirect()->back()->with('error', 'Ціна для обраного типу бронювання не знайдена.');
        }

        WeeklyBooking::create([
            'period_id' => $game_period->id,
            'participant_id' => $participantId,
            'schedule_id' => $request->schedule_id,
            'day_of_week' => $schedule->day,
            'start_time' => $schedule->start_time,
            'end_time' => $schedule->end_time,
            'booking_type' => $schedule->booking_type,
            'fixed_price' => $priceRecord->price,
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
