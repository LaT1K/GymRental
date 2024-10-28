<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('hall_booking', function (Blueprint $table) {
            $table->id();
            $table->foreignId('schedule_id')->constrained('schedule')->onDelete('cascade');
            $table->string('booking_type');
            $table->decimal('total_cost', 8, 2);
            $table->boolean('is_full_booking');
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hall_booking');
    }
};
