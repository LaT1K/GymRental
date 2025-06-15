<?php

namespace App\Http\Controllers;

use App\Http\Requests\GamePeriod\GamePeriodStoreRequest;
use App\Models\GamePeriod;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class GamePeriodController extends Controller
{
    public function index(): Response
    {
        $gamePeriods = GamePeriod::all();

        return Inertia::render('GamePeriods/Index', [
            'gamePeriods' => $gamePeriods,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('GamePeriods/Create');
    }

    public function store(GamePeriodStoreRequest $request): RedirectResponse
    {
        GamePeriod::create($request->validated());

        return to_route('game_periods.index');
    }
}
