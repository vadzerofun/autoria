FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["autoria-api/autoria-api.csproj", "autoria-api/"]
COPY ["Application/Application.csproj", "Application/"]
COPY ["Domain/Core.csproj", "Domain/"]
COPY ["Infrastructure/Infrastructure.csproj", "Infrastructure/"]
RUN dotnet restore "autoria-api/autoria-api.csproj"
COPY . .
WORKDIR "/src"
RUN dotnet build "autoria-api/autoria-api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "autoria-api/autoria-api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "autoria-api.dll"]