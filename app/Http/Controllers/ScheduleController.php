<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use App\Models\GamePeriod;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class ScheduleController extends Controller
{
    public function index(GamePeriod $game_period)
    {
        $schedules = Schedule::where('period_id', $game_period->id)->get();

        return Inertia::render('Schedules/Index', [
            'gamePeriod' => $game_period,
            'schedules' => $schedules,
        ]);
    }

    public function store(Request $request, GamePeriod $game_period)
    {
        $request->validate([
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'type' => 'required|string',
        ]);

        // Отримуємо назву дня тижня
        $dayOfWeek = Carbon::parse($request->date)->locale('uk')->dayName;

        Schedule::create([
            'period_id' => $game_period->id,
            'date' => $request->date,
            'day' => $dayOfWeek, 
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'type' => $request->type,
            'booking_type' => $request->type,
            'is_processed' => true,
        ]);

        return redirect()->route('game_periods.index')->with('message', 'Розклад успішно додано.');
    }
}
