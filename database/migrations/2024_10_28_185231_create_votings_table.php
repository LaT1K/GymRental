<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('votings', function (Blueprint $table) {
            $table->id();
            $table->string('question');
            $table->date('start_date');
            $table->date('end_date');
            $table->boolean('is_active');
            $table->string('voting_type');
            $table->string('related_class');
            $table->unsignedBigInteger('related_class_id')->nullable();
            $table->string('status');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('votings');
    }
};
