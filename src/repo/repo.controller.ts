import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Get,
  Put,
} from '@nestjs/common';
import { RepoService } from './repo.service';

interface createRepoBody {
  userId: string;
  name: string;
  link: string;
  priority: string;
  deadline: string;
  note: string;
}

interface updateRepoBody {
  userId: string;
  name?: string;
  link?: string;
  priority?: string;
  deadline?: string;
  note?: string;
}

@Controller('repo')
export class RepoController {
  constructor(private repoService: RepoService) {}

  @Post('create-repository')
  async createRepo(@Body() body: createRepoBody) {
    try {
      const userId = body.userId;
      const repoBody = body;

      if (!repoBody || !userId) {
        throw new Error('Invalid request.');
      }

      const foundRepo = await this.repoService.getAll(userId);
      const filtered = foundRepo.filter((i) => i.name === repoBody.name);
      if (filtered.length > 0) {
        throw new Error('Repository already exists.');
      }

      const newRepo = await this.repoService.create(userId, repoBody);

      if (!newRepo) {
        throw new Error('Error in creation.');
      }

      return newRepo;
    } catch (err) {
      return { message: 'Error creating repository. ' + err };
    }
  }

  @Delete('delete-repository/:name')
  async deleteRepo(
    @Body() body: { userId: string },
    @Param('name') name: string,
  ) {
    try {
      const userId = body.userId;
      const repoName = name;

      if (!userId || !repoName) {
        throw new Error('Invalid id or name in request.');
      }

      const foundRepo = await this.repoService.getAll(userId);
      const filtered = foundRepo.filter((i) => i.name === repoName);
      if (filtered.length === 0) {
        throw new Error('Repository not found.');
      }

      const deletedRepo = await this.repoService.delete(userId, repoName);

      if (!deletedRepo) {
        throw new Error('Repository not found to delete.');
      }

      return deletedRepo;
    } catch (err) {
      return { message: 'Error deleting repository. ' + err };
    }
  }

  @Get('get-all-repository')
  async getAllRepo(@Body() body: { userId: string }) {
    try {
      const userId = body.userId;

      if (!userId) {
        throw new Error('Invalid id in request.');
      }

      const repoList = await this.repoService.getAll(userId);

      if (!repoList) {
        throw new Error('Repository list is empty.');
      }

      return repoList;
    } catch (err) {
      return { message: 'Error getting repository list. ' + err };
    }
  }

  @Put('update-repository/:name')
  async updateRepo(@Param('name') name: string, @Body() body: updateRepoBody) {
    try {
      const userId = body.userId;

      const nameRepo = name;

      const repoBody = body;

      if (!userId || !repoBody || !nameRepo) {
        throw new Error('Invalid request.');
      }

      const foundRepo = await this.repoService.getAll(userId);
      const filtered = foundRepo.filter((i) => i.name === nameRepo);
      if (filtered.length == 0) {
        throw new Error('Repository not found.');
      }

      const finalBody = Object.assign(filtered[0], repoBody);

      const updatedRepo = await this.repoService.update(
        userId,
        nameRepo,
        finalBody,
      );

      if (!updatedRepo) {
        throw new Error('Repository not found to update.');
      }

      return updatedRepo;
    } catch (err) {
      return { message: 'Error updating repository: ' + err };
    }
  }
}
