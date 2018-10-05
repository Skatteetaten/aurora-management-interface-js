export interface IHealthFields {
  [index: string]: string;
}

export enum Status {
  UP,
  COMMENT,
  UNKNOWN,
  OUT_OF_SERVICE,
  DOWN
}

export namespace Status {
  export function valueOf(status: string): Status {
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
  private fields: IHealthFields;

  private status: Status;

  constructor(name: string, status: Status, fields: IHealthFields = {}) {
    this.fields = fields;
    this.name = name;
    this.status = status;
  }

  public withField(key: string, value: string): HealthStatus {
    this.fields = {
      ...this.fields,
      [key]: value
    };
    return this;
  }

  public getName(): string {
    return this.name;
  }

  public getFields(): IHealthFields {
    this.fields = {
      status: Status[this.status],
      ...this.fields
    };
    return this.fields;
  }

  public getStatus(): Status {
    return this.status;
  }
}
