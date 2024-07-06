using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace autoria_api.Migrations
{
    /// <inheritdoc />
    public partial class m1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cars",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    PriceUSD = table.Column<double>(type: "REAL", nullable: false),
                    Mileage = table.Column<double>(type: "REAL", nullable: false),
                    Make = table.Column<string>(type: "TEXT", nullable: false),
                    Model = table.Column<string>(type: "TEXT", nullable: false),
                    Year = table.Column<int>(type: "INTEGER", nullable: false),
                    Engine_capacity = table.Column<double>(type: "REAL", nullable: false),
                    Engine_type = table.Column<int>(type: "INTEGER", nullable: false),
                    Color = table.Column<string>(type: "TEXT", nullable: false),
                    Owners_number = table.Column<int>(type: "INTEGER", nullable: false),
                    Wanted = table.Column<bool>(type: "INTEGER", nullable: false),
                    Road_accident = table.Column<string>(type: "TEXT", nullable: false),
                    Carrying_capacity_ton = table.Column<double>(type: "REAL", nullable: false),
                    Car_number = table.Column<string>(type: "TEXT", nullable: false),
                    Car_vin_code = table.Column<string>(type: "TEXT", nullable: false),
                    Transmission_type = table.Column<int>(type: "INTEGER", nullable: false),
                    Occasion = table.Column<int>(type: "INTEGER", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    Number_of_seats = table.Column<int>(type: "INTEGER", nullable: false),
                    ImagesPath = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cars", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cars");
        }
    }
}
