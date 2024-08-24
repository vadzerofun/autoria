FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
RUN mkdir /app
WORKDIR /app
COPY *.sln ./
COPY Application/Application.csproj ./Application/
COPY Common/Common.csproj ./Common/
COPY Core/Core.csproj ./Core/
COPY Domain/Core.csproj ./Domain/
COPY Infrastructure/Infrastructure.csproj ./Infrastructure/
COPY autoria-api/autoria-api.csproj ./autoria-api/
COPY . .vs/
RUN dotnet restore
COPY autoria-api ./autoria-api/
COPY Application ./Application/
COPY Common ./Common/
COPY Core ./Core/
COPY Domain ./Domain/
COPY Infrastructure ./Infrastructure/
COPY .vs /.vs/

RUN dotnet publish autoria-api/autoria-api.csproj -c Release -o out


FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build-env /app/out .
RUN dotnet --info
RUN ls -la

ENTRYPOINT ["dotnet", "/app/autoria-api.dll"]