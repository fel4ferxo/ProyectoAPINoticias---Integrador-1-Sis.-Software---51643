import { Routes } from '@angular/router';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './registro/registro.component';
import { NewsComponent } from './news/news.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { TimelineComponent } from './timeline/timeline.component';
export const routes: Routes = [
    {
        path:'',
        redirectTo: 'inicio-sesion',
        pathMatch: 'full',
    },
    {
        path: 'inicio-sesion',
        component: InicioSesionComponent,
        title: 'Inicie sesion'
    },
    {
        path: 'registro',
        component: RegistroComponent,
        title: 'Regístrese'
    },
    {
        path: 'news',
        component: NewsComponent,
        canActivate: [AuthGuard],
        title: 'feed',
        children:[
            {
                path: 'user-dashboard',
                component: UserDashboardComponent
            }
        ]
    },
    {
        path: 'timeline',
        component: TimelineComponent,
        title: 'Línea de tiempo'
    }


];
