import { DynamicModule, Module, OnModuleInit } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';
import * as fs from 'fs';
import * as path from 'path';

@Module({
  imports: [],
  providers: [],
  exports: [],
})
export class AppRoutingModule implements OnModuleInit {
  async onModuleInit() {
    console.log('App Routing Module Initilize');
  }

  static async forRootAsync(options: {
    fileExtension: string;
  }): Promise<DynamicModule> {
    const dynamicRoutes = await AppRoutingModule.loadRoutes(
      options.fileExtension,
    );
    return {
      module: AppRoutingModule,
      imports: [RouterModule.register(dynamicRoutes)],
      exports: [RouterModule],
    };
  }

  private static async loadRoutes(fileExtension: string): Promise<Routes> {
    const routes: Routes = [];
    const rootDirectory = path.join(__dirname);
    console.log(rootDirectory);

    try {
      const files = await fs.promises.readdir(rootDirectory);

      for (const file of files) {
        const filefullPath = path.join(rootDirectory, file);
        const stats = await fs.promises.stat(filefullPath);

        if (stats.isDirectory()) {
          const statFiles = await fs.promises.readdir(filefullPath);

          for (const statfile of statFiles) {
            if (statfile.endsWith(fileExtension)) {
              const routesModule = require(path.join(filefullPath, statfile));

              Object.values(routesModule).forEach((routeArray) => {
                if (Array.isArray(routeArray)) {
                  routes.push(...routeArray);
                }
              });
            }
          }
        }
      }
    } catch (error) {
      console.error('Error loading routes:', error);
    }
    return routes;
  }
}
// still one problem is that i am not search any file that end with "routes.js" at root level (C:\Users\Ripple\Desktop\Projects\multi-tenant-hms\dist),
// i just searching for file that end with "routes.js" inside the folder within root level
