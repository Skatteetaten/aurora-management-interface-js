export interface HealthFields {
  [index: string]: string;
}

export class Status {
  public value: string;
  public weight: number;

  public static UP = new Status('UP', 0);
  public static COMMENT = new Status('COMMENT', 1);
  public static UNKNOWN = new Status('UNKNOWN', 2);
  public static OUT_OF_SERVICE = new Status('OUT_OF_SERVICE', 3);
  public static DOWN = new Status('DOWN', 4);

  constructor(value: string, weight: number) {
    this.value = value;
    this.weight = weight;
  }

  public static valueOf(status: string): Status {
    switch (status.toUpperCase()) {
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

  public withField(key: string, value: string): HealthStatus {
    this.fields = {
      ...this.fields,
      [key]: value,
    };
    return this;
  }

  public getName(): string {
    return this.name;
  }

  public getFields(): HealthFields {
    this.fields = {
      status: this.status.value,
      ...this.fields,
    };
    return this.fields;
  }

  public getStatus(): Status {
    return this.status;
  }
}
