// services/DashboardEngine.ts
import { DASHBOARD_REGISTRY, DashboardApp, AppTag } from '@/config/apps';

export class DashboardEngine {
  private registry: DashboardApp[];

  constructor(customRegistry?: DashboardApp[]) {
    this.registry = customRegistry || DASHBOARD_REGISTRY;
  }

  public getAppsByTags(targetTags: AppTag[]): DashboardApp[] {
    return this.registry.filter(app => 
      app.tags.some(tag => targetTags.includes(tag))
    );
  }

  public getFunStuff(): DashboardApp[] {
    return this.getAppsByTags(['Game']).filter(app => !app.tags.includes('Education'));
  }
}
