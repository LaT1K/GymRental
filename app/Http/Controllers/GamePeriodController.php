<?php

namespace App\Http\Controllers;

use App\Models\GamePeriod;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GamePeriodController extends Controller
{
    public function index()
    {
        $gamePeriods = GamePeriod::all();
        return Inertia::render('GamePeriods/Index', [
            'gamePeriods' => $gamePeriods,
        ]);
    }

    public function create()
    {
        return Inertia::render('GamePeriods/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'duration_weeks' => 'required|integer|min:1',
        ]);
    
        GamePeriod::create($request->all());
    
        return redirect()->route('game_periods.index')->with('success', 'Період гри успішно додано');
    }
}
