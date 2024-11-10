FROM php:8.3-fpm

# Встановлення необхідних розширень PHP
RUN docker-php-ext-install pdo pdo_mysql

# Встановлення Composer
WORKDIR /var/www
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Встановлення додаткових інструментів
RUN apt-get update && \
    apt-get install -y zip unzip git && \
    rm -rf /var/lib/apt/lists/*
