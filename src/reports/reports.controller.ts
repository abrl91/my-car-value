import { Body, Controller, Post, Patch, Param, UseGuards } from "@nestjs/common";
import { CreateReportDto } from "./dto/create-report.dto";
import { ReportsService } from "./reports.service";
import { AuthGuard } from "../guards/auth.guard";
import { CurrentUser } from "../users/decorators/current-user.decorator";
import { User } from "../users/user.entity";
import { Serialize } from "../iterceptors/serialize.interceptor";
import { ReportDto } from "./dto/report.dto";
import { ApproveReportDto } from "./dto/approve-report.dto";

@Controller('reports')
export class ReportsController {

  constructor(private reportService: ReportsService) {}

  @Post('')
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportService.create(body, user);
  }

  @Patch('/:id')
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto ) {
    return this.reportService.changeApproval(id, body.approved);
  }
}
