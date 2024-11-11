<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ParticipantController;
use App\Http\Controllers\GamePeriodController;
use App\Http\Controllers\PriceController;
use App\Http\Controllers\BookingPlanController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\WeeklyBookingController;


Route::middleware(['auth'])->group(function () {
    Route::get('/game_periods/{game_period}/schedules', [ScheduleController::class, 'index'])->name('schedules.index');
    Route::post('/game_periods/{game_period}/schedules', [ScheduleController::class, 'store'])->name('schedules.store');

    Route::get('/game_periods/{game_period}/weekly_bookings', [WeeklyBookingController::class, 'index'])->name('weekly_bookings.index');
    Route::post('/game_periods/{game_period}/weekly_bookings', [WeeklyBookingController::class, 'store'])->name('weekly_bookings.store');
    Route::delete('/weekly_bookings/{id}', [WeeklyBookingController::class, 'destroy'])->name('weekly_bookings.destroy');

});

Route::middleware(['auth'])->group(function () {
    Route::get('/booking', [BookingPlanController::class, 'index'])->name('booking.index');
    Route::post('/booking', [BookingPlanController::class, 'store'])->name('booking.store');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/schedule', [ScheduleController::class, 'index'])->name('schedule.index');
});

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/home', function () {
    return Inertia::render('Home');
})->middleware(['auth', 'verified'])->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::middleware(['auth'])->group(function () {
    Route::get('/participants', [ParticipantController::class, 'index'])->name('participants.index');
    Route::get('/participants/create', [ParticipantController::class, 'create'])->name('participants.create');
    Route::post('/participants', [ParticipantController::class, 'store'])->name('participants.store');
    Route::get('/participants/{id}', [ParticipantController::class, 'show'])->name('participants.show');
    Route::get('/participants/{id}/edit', [ParticipantController::class, 'edit'])->name('participants.edit');
    Route::put('/participants/{id}', [ParticipantController::class, 'update'])->name('participants.update');
    Route::delete('/participants/{id}', [ParticipantController::class, 'destroy'])->name('participants.destroy');
    Route::get('/game_periods', [GamePeriodController::class, 'index'])->name('game_periods.index');
    Route::get('/game_periods/create', [GamePeriodController::class, 'create'])->name('game_periods.create');
    Route::post('/game_periods', [GamePeriodController::class, 'store'])->name('game_periods.store');
    Route::get('/pricing', [PriceController::class, 'index'])->name('prices.index');
    Route::put('/pricing/{price}', [PriceController::class, 'update'])->name('prices.update');

});



require __DIR__.'/auth.php';
