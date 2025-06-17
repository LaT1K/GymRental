<?php

use App\Http\Controllers\BookingPlanController;
use App\Http\Controllers\GamePeriodController;
use App\Http\Controllers\ParticipantController;
use App\Http\Controllers\PriceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\WeeklyBookingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::post('/telegram/<token>/webhook', function () {
    $update = Telegram::commandsHandler(true);

    // Commands handler method returns an Update object.
    // So you can further process $update object
    // to however you want.

    return 'ok';
})->withoutMiddleware(['auth', 'verified']);


Route::get('/', function () {
    redirect()->route('dashboard');
})->middleware(['auth', 'verified']);

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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard/Index');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/participants', [ParticipantController::class, 'index'])->name('participants.index');
    Route::get('/participants/create', [ParticipantController::class, 'create'])->name('participants.create');
    Route::post('/participants', [ParticipantController::class, 'store'])->name('participants.store');
    Route::get('/participants/{participant}', [ParticipantController::class, 'show'])->name('participants.show');
    Route::get('/participants/{participant}/edit', [ParticipantController::class, 'edit'])->name('participants.edit');
    Route::put('/participants/{participant}', [ParticipantController::class, 'update'])->name('participants.update');
    Route::delete('/participants/{participant}', [ParticipantController::class, 'destroy'])->name('participants.destroy');
    Route::get('/game_periods', [GamePeriodController::class, 'index'])->name('game_periods.index');
    Route::get('/game_periods/create', [GamePeriodController::class, 'create'])->name('game_periods.create');
    Route::post('/game_periods', [GamePeriodController::class, 'store'])->name('game_periods.store');
    Route::get('/pricing', [PriceController::class, 'index'])->name('prices.index');
    Route::put('/pricing/{price}', [PriceController::class, 'update'])->name('prices.update');

});

require __DIR__.'/auth.php';
