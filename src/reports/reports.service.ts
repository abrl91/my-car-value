import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Report } from "./report.entity";
import { Repository } from "typeorm";
import { CreateReportDto } from "./dto/create-report.dto";
import { User } from "../users/user.entity";
import { GetEstimateDto } from "./dto/get-estimate.dto";

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private reportRepo: Repository<Report>) {
  }

  create(reportDto: CreateReportDto, user: User) {
    const newReport = this.reportRepo.create(reportDto);
    newReport.user = user;
    return this.reportRepo.save(newReport);
  }

  async changeApproval(userId: string, approved: boolean) {
     const report = await this.reportRepo.findOne(userId);
     if (!report) throw new NotFoundException('report not found');

     report.approved = approved;
     return this.reportRepo.save(report);
  }

  createEstimate({ make, model, year, lat, lng, mileage }: GetEstimateDto) {
    this.reportRepo.createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('lng = :lng BETWEEN -5 AND 5', { lng })
      .andWhere('lat = :lat BETWEEN -5 AND 5', { lat })
      .andWhere('year = :year BETWEEN -3 AND 3', { year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage = :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3 )
      .getRawOne()
      .then((result) => console.log(result));
  }
}
