import { Routes } from '@angular/router';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './registro/registro.component';
import { NewsComponent } from './news/news.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
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
        //Componentes que aparecen solo si estás logeado
        path: 'news',
        component: NewsComponent,
        title: 'feed',
        children:[
            {
                path: 'user-dashboard',
                component: UserDashboardComponent
            }
        ]
    }

];
