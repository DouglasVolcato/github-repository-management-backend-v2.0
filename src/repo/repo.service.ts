import { Injectable } from '@nestjs/common';
import Repository from '../entities/repo.entity';
import { RepoRepository } from 'src/database/repositories/repo.repository';

@Injectable()
export class RepoService {
  async create(userId, repoBody) {
    const id = userId;
    const newRepo = new Repository(repoBody);
    newRepo.validate();
    const repo = await RepoRepository.create(id, newRepo.getRepo());
    return repo.repositories.filter((item) => item.name === repoBody.name);
  }

  async delete(userId, repoName) {
    const repo = await RepoRepository.delete(userId, repoName);
    return repo.repositories.filter((item) => item.name === repoName);
  }

  async getAll(userId) {
    const repo = await RepoRepository.getAll(userId);
    return repo.repositories;
  }

  async update(userId, nameRepo, repoBody) {
    const newRepo = new Repository(repoBody);
    newRepo.validate();
    const repo = await RepoRepository.update(
      userId,
      nameRepo,
      newRepo.getRepo(),
    );
    return repo.repositories.filter((item) => item.name === newRepo.name);
  }
}
