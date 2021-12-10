import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Report } from "./report.entity";
import { Repository } from "typeorm";
import { CreateReportDto } from "./dto/create-report.dto";
import { User } from "../users/user.entity";

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private reportRepo: Repository<Report>) {
  }

  create(reportDto: CreateReportDto, user: User) {
    const newReport = this.reportRepo.create(reportDto);
    newReport.user = user;
    return this.reportRepo.save(newReport);
  }
}
