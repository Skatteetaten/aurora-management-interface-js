export type HealthFields = { [index: string]: string };

export enum Status {
  UP,
  COMMENT,
  UNKNOWN,
  OUT_OF_SERVICE,
  DOWN
}

export namespace Status {
  export function valueOf(status: String): Status {
    switch (status) {
      case 'UP':
        return Status.UP;
      case 'COMMENT':
        return Status.COMMENT;
      case 'UNKNOWN':
        return Status.UNKNOWN;
      case 'OUT_OF_SERVICE':
        return Status.OUT_OF_SERVICE;
      case 'DOWN':
        return Status.DOWN;

      default:
        return Status.UNKNOWN;
    }
  }
}

export class HealthStatus {
  private name: string;
  private fields: HealthFields;

  private status: Status;

  constructor(name: string, status: Status, fields: HealthFields = {}) {
    this.fields = fields;
    this.name = name;
    this.status = status;
  }

  withField(key: string, value: string): HealthStatus {
    this.fields = {
      ...this.fields,
      [key]: value
    };
    return this;
  }

  getName(): string {
    return this.name;
  }

  getFields(): HealthFields {
    this.fields = {
      status: Status[this.status],
      ...this.fields
    };
    return this.fields;
  }

  getStatus(): Status {
    return this.status;
  }
}
