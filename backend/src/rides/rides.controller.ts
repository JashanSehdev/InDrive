import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { RidesService } from './rides.service.js';
import { CreateRideDto } from './dto/create-ride.dto.js';
import { UpdateRideDto } from './dto/update-ride.dto.js';
import { Request } from 'express';

@Controller('rides')
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @Post()
  create(@Body() createRideDto: CreateRideDto, @Req() req : Request & {user : any}) {
    return this.ridesService.create(createRideDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.ridesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ridesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRideDto: UpdateRideDto) {
    return this.ridesService.update(+id, updateRideDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ridesService.remove(+id);
  }
}
