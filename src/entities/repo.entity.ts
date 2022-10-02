export default class Repository {
  name: string;
  link: string;
  priority: string;
  deadline: string;
  note: string;

  constructor(repo) {
    this.name = repo.name;
    this.link = repo.link;
    this.priority = repo.priority;
    this.deadline = repo.deadline;
    this.note = repo.note;
  }

  validate() {
    if (
      !this.name ||
      !this.link ||
      !this.priority ||
      !this.deadline ||
      !this.note
    ) {
      throw new Error('Missing required fields for Repository.');
    }
  }

  getRepo() {
    return {
      name: this.name,
      link: this.link,
      priority: this.priority,
      deadline: this.deadline,
      note: this.note,
    };
  }
}
